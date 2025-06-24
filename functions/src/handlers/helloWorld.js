const hello = async (ctx) => {
    return ctx.body = {
        message: 'Hello, World!'
    }
}

module.exports = {
    hello
}