const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

async function runMigrations() {
    const pool = new Pool({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 5432,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    const client = await pool.connect();

    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS schema_migrations (
            id BIGSERIAL PRIMARY KEY,
            filename TEXT NOT NULL UNIQUE,
            applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );
        `);

        const migrationsDir = path.join(process.cwd(), 'migrations');
        const files = fs
            .readdirSync(migrationsDir)
            .filter((f) => f.endsWith('.up.sql'))
            .sort();

        for (const file of files) {
            const already = await client.query(
                'SELECT 1 FROM schema_migrations WHERE filename = $1 LIMIT 1',
                [file]
            );

            if (already.rowCount > 0) {
                console.log('Skipping already applied migration:', file);
                continue;
            }

            const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');

            console.log('Applying migration:', file);
            await client.query('BEGIN');
            try {
                await client.query(sql);
                await client.query(
                    'INSERT INTO schema_migrations (filename) VALUES ($1)',
                    [file]
                );
                await client.query('COMMIT');
            } catch (err) {
                await client.query('ROLLBACK');
                throw err;
            }
        }

        console.log('Migrations complete');
    } finally {
        client.release();
        await pool.end();
    }
}

runMigrations().catch((err) => {
    console.error('Migration failed:', err.message);
    process.exit(1);
});