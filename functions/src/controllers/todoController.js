const todoRepository = require("../database/todoRepository");

/**
 *
 * @param ctx
 * @returns {Promise<{success: boolean, data: [{id: number, title: string, completed: boolean}], message: string}|{success: boolean, message: string}>}
 */
const getTodos = async (ctx) => {
    try {
        const todos = await todoRepository.findAll();
        ctx.status = 200;
        return ctx.body = {
            success: true,
            data: todos,
            message: "Get todos successfully"
        };
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        };
    }
}

/**
 * 
 * @param ctx 
 * @returns {Promise<{success: boolean, data: {id: number, title: string, completed: boolean}, message: string}|{success: boolean, message: string}>}
 */
const getTodo = async (ctx) => {
    try {
        const todo = await todoRepository.findById(ctx.params.id);
        if (!todo) {
            throw new Error("Todo not found");
        }
        ctx.status = 200;
        return ctx.body = {
            success: true,
            data: todo,
            message: "Get todo successfully"
        };
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        };
    }
}
/**
 * 
 * @param ctx 
 * @returns {Promise<{success: boolean, data: {id: number, title: string, completed: boolean}, message: string}|{success: boolean, message: string}>}
 */
const addTodo = async (ctx) => {
    try {
        const response = await todoRepository.add(ctx.req.body);
        ctx.status = 201;
        return ctx.body = {
            success: true,
            data: response,
            message: "Create todo successfully"
        };
    } catch (e) {
        ctx.status = 400;
        return ctx.body = {
            success: false,
            error: e.message
        };
    }
}

/**
 * 
 * @param ctx 
 * @returns {Promise<{success: boolean, data: {id: number, title: string, completed: boolean}, message: string}|{success: boolean, message: string}>}
 */
const updateTodo = async (ctx) => {
    try {
        const { id } = ctx.params;
        if (!id) {
            throw new Error("Id not found");
        }
        if (!(await todoRepository.isExisted(id))) {
            throw new Error("Todo not found");
        }
        const response = await todoRepository.update(id, ctx.req.body);
        ctx.status = 200;
        return ctx.body = {
            success: true,
            data: response,
            message: "Update todo successfully"
        };
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        };
    }
}

/**
 * 
 * @param ctx 
 * @returns {Promise<{success: boolean, data: [{id: number, completed: boolean}], message: string}|{success: boolean, message: string}>}
 */
const updateTodos = async (ctx) => {
    try {
        let updatedData = ctx.req.body;
        updatedData.map(async (todo) => {
            if (!(await todoRepository.isExisted(todo.id))) {
                throw new Error("Todo(s) not found");
            }
        });
        const response = await todoRepository.updateMany(updatedData);
        ctx.status = 200;
        return ctx.body = {
            success: true,
            data: response,
            message: "Update todos successfully"
        };
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

/**
 * 
 * @param ctx 
 * @returns {Promise<{success: boolean, data: null, message: string}|{success: boolean, message: string}>}
 */
const deleteById = async (ctx) => {
    try {
        const { id } = ctx.params;
        if (!id) {
            throw new Error("Id not found");
        }
        if (!(await todoRepository.isExisted(id))) {
            throw new Error("Todo not found");
        }
        await todoRepository.deleteById(id);
        ctx.status = 200;
        return ctx.body = {
            success: true,
            data: null,
            message: "Delete todo successfully"
        };
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        };
    }
}

/**
 * 
 * @param ctx 
 * @returns {Promise<{success: boolean, data: null, message: string}|{success: boolean, message: string}>}
 */
const deleteTodos = async (ctx) => {
    try {
        const { ids } = ctx.req.body
        if (!ids || ids.length === 0) {
            throw new Error("Ids not found");
        }
        for (const id of ids) {
            if (!(await todoRepository.isExisted(id))) {
                throw new Error("Todo(s) not found");
            }
        }
        await todoRepository.deleteMany(ids);
        ctx.status = 200;
        return ctx.body = {
            success: true,
            data: null,
            message: "Delete todos successfully"
        };
    } catch (e) {
        return ctx.body = {
            success: false,
            error: e.message
        }
    }
}

module.exports = {
    getTodos,
    getTodo,
    addTodo,
    updateTodo,
    updateTodos,
    deleteById,
    deleteTodos
};