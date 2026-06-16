CREATE TABLE IF NOT EXISTS recurring_expenses (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    due_day INT NOT NULL,
    one_time bit NOT NULL DEFAULT 0,
    created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_on TIMESTAMPTZ NOT NULL DEFAULT NOW()
);