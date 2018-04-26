import Tag from '../models/tag.js';
import Article from '../models/article';

export async function createTag(ctx) {
    const tagName = ctx.request.body.name;
    if (tagName === '') {
        ctx.throw(400, '标签名不能为空');
    }
    const tag = await Tag.findOne({ name: tagName }).catch(err => {
        ctx.throw(500, '服务器错误');
    });
    console.log(tag);
    if (tag !== null) {
        ctx.body = {
            success: true,
            tag: tag,
        };
        return;
    }
    const newTag = new Tag({
        name: tagName,
    });
    const result = await newTag.save().catch(err => {
        ctx.throw(500, '服务器错误');
    });
    ctx.body = {
        success: true,
        tag: result,
    };
}

export async function getAllTags(ctx) {
    const tagArr = await Tag.find().catch(err => {
        ctx.throw(500, '服务器内部错误');
    });
    ctx.body = {
        success: true,
        tagArr,
    };
}

export async function modifyTag(ctx) {
    const id = ctx.params.id;
    const name = ctx.request.body.name;
    if (name === '') {
        ctx.throw(400, '标签名不能为空');
    }
    const tag = await Article.findByIdAndUpdate(id, { $set: { name: name } }).catch(err => {
        if (err.name === 'CastError') {
            ctx.throw(400, 'id不存在');
        } else {
            ctx.throw(500, '服务器内部错误');
        }
    });
    ctx.body = {
        success: true,
    };
}

export async function deleteTag(ctx) {
    const id = ctx.params.id;
    const tag = await Tag.findByIdAndRemove(id).catch(err => {
        if (err.name === 'CastError') {
            ctx.throw(400, 'id不存在');
        } else {
            ctx.throw(500, '服务器内部错误');
        }
    });
    ctx.body = {
        success: true,
    };
}
