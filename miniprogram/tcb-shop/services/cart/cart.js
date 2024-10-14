import { model, getAll } from '../../services/_utils/model';
import { config } from '../../config/index';
import { DATA_MODEL_KEY } from '../../config/model';
import { cloudbaseTemplateConfig } from '../../config/index';
import { CART_ITEM } from '../cloudbaseMock/index';

const CATE_ITEM_MODEL_KEY = DATA_MODEL_KEY.CART_ITEM;

/** 获取购物车mock数据 */
function mockFetchCartGroupData(params) {
  const { delay } = require('../_utils/delay');
  const { genCartGroupData } = require('../../model/cart');

  return delay().then(() => genCartGroupData(params));
}

/**
 *
 * @param {{id: string}} param0
 * @returns
 */
export async function getCartItem({ id }) {
  return model()[CATE_ITEM_MODEL_KEY].get({
    filter: {
      where: {
        _id: {
          $eq: id,
        },
      },
    },
    select: {
      _id: true,
      count: true,
      sku: {
        _id: true,
        count: true,
        description: true,
      },
    },
  });
}

export async function fetchCartItems() {
  if (cloudbaseTemplateConfig.useMock) {
    return CART_ITEM;
  }

  return getAll({
    name: CATE_ITEM_MODEL_KEY,
    select: {
      _id: true,
      count: true,
      sku: {
        _id: true,
        count: true,
        description: true,
      },
    },
  });
}

/**
 *
 * @param {{
 *   skuId: String,
 *   count: Number
 * }} param0
 */
export async function createCartItem({ skuId, count }) {
  if (cloudbaseTemplateConfig.useMock) {
    CART_ITEM.push({ sku: { _id: skuId, count, description: 'NO_DESC' } });
    return;
  }
  return await model()[CATE_ITEM_MODEL_KEY].create({
    data: {
      count,
      sku: { _id: skuId },
    },
  });
}

/**
 *
 * @param {{cartItemId: string}} param0
 */
export async function deleteCartItem({ cartItemId }) {
  return await model()[CATE_ITEM_MODEL_KEY].delete({
    filter: {
      where: {
        _id: {
          $eq: cartItemId,
        },
      },
    },
  });
}

/**
 *
 * @param {{
 *   cartItemId: String,
 *   count: Number
 * }} param0
 * @returns
 */
export async function updateCartItemCount({ cartItemId, count }) {
  if (cloudbaseTemplateConfig.useMock) {
    CART_ITEM.find((x) => x._id === cartItemId).count = count;
    return;
  }
  return await model()[CATE_ITEM_MODEL_KEY].update({
    data: {
      count,
    },
    filter: {
      where: {
        _id: {
          $eq: cartItemId,
        },
      },
    },
  });
}

/** 获取购物车数据 */
export function fetchCartGroupData(params) {
  if (config.useMock) {
    return mockFetchCartGroupData(params);
  }

  return new Promise((resolve) => {
    resolve('real api');
  });
}
