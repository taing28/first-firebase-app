const yup = require('yup');

const todoInputMiddleware = async (ctx, next) => {
  try {
    const postData = ctx.request.body;
    let schema = yup.object().shape({
      title: yup.string().required(),
    });

    await schema.validate(postData);
    await next();
  } catch (e) {
    ctx.status = 400;
    ctx.body = {
      success: false,
      errors: e.errors,
      errorName: e.name
    }
  }

}

module.exports = todoInputMiddleware;