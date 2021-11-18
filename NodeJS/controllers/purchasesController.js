const express = require("express");
const router = express.Router();
const purchaseService = require("../services/purchaseService");

router
  .route("/")
  .get(async (req, res) => {
    try {
      const purchases = await purchaseService.getAll();
      return res.status(200).json(purchases);
    } catch (error) {
      return res.status(400).json(error);
    }
  })
  .post(async (req, res) => {
    try {
      const purchase = req.body;
      const result = await purchaseService.addPurchase(purchase);
      return res.status(202).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

router
  .route("/:id")
  .put(async (req, res) => {
    try {
      const id = req.params.id;
      const updatePurchase = req.body;
      const result = await purchaseService.updatePurchase(id, updatePurchase);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      const result = await purchaseService.deletePurchase(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

router
  .route("/by_product/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const result = await purchaseService.getUsersByProduct(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      const result = await purchaseService.deletePurchasesByProducts(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  });

router
  .route("/by_customer/:id")
  .get(async (req, res) => {
    try {
      const id = req.params.id;
      const result = await purchaseService.getProductsByUser(id);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  })
  .delete(async (req, res) => {
    try {
      const id = req.params.id;
      const result = await purchaseService.deletePurchasesByProducts(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(400).json(error);
    }
  });
router.route("/product_join_purchase").get(async (req, res) => {
  try {
    const result = await purchaseService.getProductsJoinpurchases();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});
router.route("/all_join").get(async (req, res) => {
  try {
    const result = await purchaseService.getJoinAll();
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
