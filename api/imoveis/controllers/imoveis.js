const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async find(ctx) {
    let entities;

    let totalImoveis;
    const allItems = await strapi.services.imoveis.find();
    totalImoveis = allItems.length;

    if (ctx.query._q) {
      const data = await strapi.services.imoveis.search(ctx.query);
      entities = data;
    } else {
      const data = await strapi.services.imoveis.find(ctx.query);
      entities = data;
    }

    const imoveis = entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.imoveis })
    );

    return {
      totalImoveis,
      imoveis,
    };
  },

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.imoveis.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.imoveis });
  },

  count(ctx) {
    if (ctx.query._q) {
      return strapi.services.restaurant.countSearch(ctx.query);
    }
    return strapi.services.restaurant.count(ctx.query);
  },

  async create(ctx) {
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.restaurant.create(data, { files });
    } else {
      entity = await strapi.services.restaurant.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.restaurant });
  },

  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.restaurant.update({ id }, data, {
        files,
      });
    } else {
      entity = await strapi.services.restaurant.update(
        { id },
        ctx.request.body
      );
    }

    return sanitizeEntity(entity, { model: strapi.models.restaurant });
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.restaurant.delete({ id });
    return sanitizeEntity(entity, { model: strapi.models.restaurant });
  },
};
