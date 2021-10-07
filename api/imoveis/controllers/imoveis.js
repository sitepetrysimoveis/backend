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
};
