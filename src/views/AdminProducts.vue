<template>
    <div class="container" v-if="!returnLoading">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent px-0">
              <li class="breadcrumb-item text-secondary"><small>後台管理系統</small></li>
              <li class="breadcrumb-item active" aria-current="adminOrders">
                <a href="#">
                  <small>商品列表管理</small>
                </a>
              </li>
          </ol>
        </nav>
        <div class="row">
            <div class="col-md-10">
                <h2 class="text-brown">商品列表管理</h2>
            </div>
            <div class="col-md-2 text-right">
                <button type="button" class="btn btn-brown" @click.prevent="openModal()">
                    新增產品
                </button>
            </div>
        </div>
        <table class="table table-borderless mt-4 bg-white border border-brown border-bottom-0">
            <thead>
                <tr class="bg-brown text-white text-center">
                    <th width="100px" scope="col">編號</th>
                    <th width="150px" scope="col">產品類別</th>
                    <th scope="col">產品名稱</th>
                    <th width="150px" scope="col">產品原價</th>
                    <th width="150px" scope="col">產品售價</th>
                    <th width="100px" scope="col">是否啟用</th>
                    <th width="150px" scope="col">編輯</th>
                </tr>
            </thead>
            <tbody class="text-secondary">
                <tr class="border border-brown border-bottom"
                    v-for="item in returnProducts" :key="item.id">
                    <th class="text-center" scope="row">{{ item.num }}</th>
                    <td class="text-center">{{ item.category }}</td>
                    <td class="text-center">{{ item.title }}</td>
                    <td class="text-right">{{ item.origin_price }}$</td>
                    <td class="text-right">{{ item.price }}$</td>
                    <td class="text-center" v-if="item.is_enabled">已啟用</td>
                    <td class="text-center" v-if="!item.is_enabled">未啟用</td>
                    <td class="text-center">
                      <button class="btn btn-sm btn-outline-brown rounded"
                              @click="openModal(false, item)">
                              編輯
                      </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <nav class="d-flex justify-content-center mt-5">
            <ul class="pagination">
                <li class="page-item" v-for="num in returnTotalPage"
                    :key="num"
                    @click.prevent="getProducts(num)"
                    :class="{'active': returnCurrentPage == num}">
                    <a class="page-link" href="#">
                      {{ num }}
                    </a>
                </li>
            </ul>
        </nav>
        <div class="modal fade" id="createModal" tabindex="-1" role="dialog"
             aria-labelledby="createModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header bg-brown text-white">
                <h5 class="modal-title" id="createModalLabel">新增產品</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-sm-4">
                            <div class="form-group">
                            <label for="image">輸入圖片網址</label>
                            <input type="text" class="form-control" id="image"
                                    placeholder="請輸入圖片連結"
                                    v-model="product.imageUrl">
                            </div>
                            <div class="form-group">
                            <label for="customFile">或 上傳圖片
                                <i class="fas fa-spinner fa-spin text-brown"
                                   v-if="returnUpdateStatus">
                                </i>
                            </label>
                            <input type="file" id="customFile" class="form-control"
                                    ref="files" @change="uploadFile()">
                            </div>
                            <img class="img-fluid" alt=""
                                 :src="product.imageUrl">
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                            <label for="title">標題</label>
                            <input type="text" class="form-control" id="title"
                                    placeholder="請輸入標題"
                                    v-model="product.title">
                            </div>
                            <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="category">分類</label>
                                <input type="text" class="form-control" id="category"
                                    placeholder="請輸入分類"
                                    v-model="product.category">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">單位</label>
                                <input type="unit" class="form-control" id="unit"
                                    placeholder="請輸入單位"
                                    v-model="product.unit">
                            </div>
                            </div>
                            <div class="form-row">
                            <div class="form-group col-md-6">
                                <label for="origin_price">原價</label>
                                <input type="number" class="form-control" id="origin_price"
                                    placeholder="請輸入原價"
                                    v-model="product.origin_price">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">售價</label>
                                <input type="number" class="form-control" id="price"
                                    placeholder="請輸入售價"
                                    v-model="product.price">
                            </div>
                            </div>
                            <hr>
                            <div class="form-group">
                            <label for="description">產品描述</label>
                            <textarea type="text" class="form-control" id="description"
                                        placeholder="請輸入產品描述"
                                        v-model="product.description">
                            </textarea>
                            </div>
                            <div class="form-group">
                            <label for="content">說明內容</label>
                            <textarea type="text" class="form-control" id="content"
                                        placeholder="請輸入產品說明內容"
                                        v-model="product.content">
                            </textarea>
                            </div>
                            <div class="form-group">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox"
                                    id="is_enabled"
                                    v-model="product.is_enabled">
                                <label class="form-check-label" for="is_enabled">
                                啟用
                                </label>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary"
                          data-dismiss="modal">
                          取消
                  </button>
                  <button type="button" class="btn btn-brown"
                          @click.prevent="submitProduct">
                          送出
                  </button>
                  <button class="btn btn-danger" v-if="!returnIsNew"
                          @click.prevent="deleteProduct()">
                          刪除
                  </button>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      product: {},
    };
  },
  methods: {
    getProducts(page = 1) {
      this.$store.dispatch('adminGetProducts', page);
    },
    submitProduct() {
      this.$store.dispatch('adminSubmitProduct', this.product);
    },
    deleteProduct() {
      this.$store.dispatch('adminDeleteProduct', this.product.id);
    },
    uploadFile() {
      this.$store.dispatch('adminProductUploadFile', this.$refs.files.files[0]);
    },
    openModal(isNew = true, item) {
      this.$store.dispatch('adminProductOpenModal', {
        isNew,
        item,
      });
      this.product = this.returnProduct;
    },
  },
  computed: {
    returnProducts() {
      return this.$store.state.admin.products;
    },
    returnProduct() {
      return this.$store.state.admin.product;
    },
    returnIsNew() {
      return this.$store.state.admin.productIsNew;
    },
    returnTotalPage() {
      return this.$store.state.admin.productTotalPage;
    },
    returnCurrentPage() {
      return this.$store.state.admin.productCurrentPage;
    },
    returnLoading() {
      return this.$store.state.loadingStatus;
    },
    returnUpdateStatus() {
      return this.$store.state.updateStatus;
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
