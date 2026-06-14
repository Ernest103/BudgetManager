const { checkDbConnection } = require('../config/db');

async function getHealth(_req, res) {
  try {
    await checkDbConnection();

    return res.status(200).json({
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: 'connected',
    });
  } catch (error) {
    return res.status(503).json({
      status: 'degraded',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message,
    });
  }
}

module.exports = {
  getHealth,
};
