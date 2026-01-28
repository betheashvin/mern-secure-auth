// api/index.js
module.exports = async (req, res) => {
    // 1. Dynamic import fixes the "ERR_REQUIRE_ESM" error
    const { default: app } = await import('../server/server.js');
    
    // 2. Pass the request/response to your Express app
    app(req, res);
};