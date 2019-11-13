<template>
    <div class="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-transparent px-0">
              <li class="breadcrumb-item text-secondary"><small>後台管理系統</small></li>
              <li class="breadcrumb-item active" aria-current="adminCoupons">
                <a href="#">
                  <small>優惠券管理</small>
                </a>
              </li>
          </ol>
        </nav>
        <div class="row">
            <div class="col-md-10">
                <h2 class="text-brown">優惠券管理</h2>
            </div>
            <div class="col-md-2 text-right">
                <button type="button" class="btn btn-brown" @click.prevent="openModal(true)">
                    新增優惠券
                </button>
            </div>
        </div>
        <div class="row">
            <div class="col-md-4 mt-4" v-for="item in coupons" :key="item.id">
                <div class="justify-content-start align-items-center bg-white border rounded p-3">
                    <h3 class="m-0 text-overhidden">{{ item.title }}</h3>
                    <p class="m-0 text-secondary">到期日：{{ dateTransfer(item.dueDate) }}</p>
                    <button class="btn btn-brown d-block w-100 mt-4"
                            @click.prevent="openModal(false, item)">
                            編輯
                    </button>
                </div>
            </div>
        </div>
        <nav class="d-flex justify-content-center mt-5">
            <ul class="pagination">
                <li class="page-item" v-for="num in totalPage"
                    :key="num"
                    @click.prevent="getCoupons(num)"
                    :class="{'active': currentPage == num}">
                    <a class="page-link" href="#">{{ num }}</a>
                </li>
            </ul>
        </nav>
        <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
             aria-labelledby="couponModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header bg-brown text-white">
                        <h5 class="modal-title" id="couponModalLabel">新增優惠券</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="image">優惠券標題</label>
                            <input type="text" class="form-control" v-model="coupon.title">
                        </div>
                        <div class="form-group">
                            <label for="image">優惠券代碼</label>
                            <input type="text" onKeyUp="value=value.replace(/[\W]/g,'')"
                                   class="form-control" v-model="coupon.code">
                        </div>
                        <div class="form-group">
                            <label for="image">折扣百分比</label>
                            <input type="number" max="100" min="0" step="5" class="form-control"
                                   v-model="coupon.percent" @click.prevent>
                        </div>
                        <div class="form-group">
                            <label for="image">到期日</label>
                            <input type="datetime-local" class="form-control"
                                   v-model="coupon.dueDate">
                        </div>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox"
                                id="is_enabled"
                                v-model="coupon.is_enabled">
                            <label class="form-check-label" for="is_enabled">
                                啟用
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                                data-dismiss="modal">
                                取消
                        </button>
                        <button type="button" class="btn btn-brown"
                                @click.prevent="submitCoupon()">
                                送出
                        </button>
                        <button type="button" class="btn btn-danger"
                                @click.prevent="deleteCoupon()">
                                刪除
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Coupons',
  data() {
    return {
      coupons: [],
      coupon: {},
      isNew: true,
      totalPage: 0,
      currentPage: 1,
    };
  },
  methods: {
    getCoupons(page = 1) {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`;
      this.$http.get(api).then((Response) => {
        vm.coupons = Response.data.coupons;
        vm.totalPage = Response.data.pagination.total_pages;
        vm.currentPage = Response.data.pagination.current_page;
      });
    },
    submitCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let mode = 'post';
      if (!vm.isNew) {
        mode = 'put';
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.coupon.id}`;
      }
      const dueDate = vm.coupon.dueDate.split('T')[0];
      const timeStamp = new Date(`${dueDate.split('-')[0]}/${dueDate.split('-')[1]}/${dueDate.split('-')[2]}`);
      this.$set(vm.coupon, 'dueDate', timeStamp.getTime());
      this.$http[mode](api, { data: vm.coupon }).then(() => {
        vm.getCoupons();
        $('#couponModal').modal('hide');
      });
    },
    deleteCoupon() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.coupon.id}`;
      this.$http.delete(api).then(() => {
        if (vm.currentPage > vm.totalPage) {
          vm.getCoupons(vm.currentPage - 1);
          vm.currentPage -= 1;
        } else {
          vm.getCoupons(vm.currentPage);
        }
        $('#couponModal').modal('hide');
      });
    },
    openModal(isNew = true, item) {
      if (isNew) {
        this.coupon = {};
        this.isNew = true;
      } else {
        this.coupon = Object.assign({}, item);
        const date = new Date(item.dueDate);
        const dateStr = `${date.getFullYear()}-${this.addZero(date.getMonth() + 1)}-${this.addZero(date.getDate())}T${this.addZero(date.getHours())}:${this.addZero(date.getMinutes())}`;
        this.coupon.dueDate = dateStr;
        this.isNew = false;
      }
      $('#couponModal').modal('show');
    },
    dateTransfer(date) {
      const dateOrigin = new Date(date);
      return `${dateOrigin.getFullYear()}-${this.addZero(dateOrigin.getMonth() + 1)}-${this.addZero(dateOrigin.getDate())}`;
    },
    addZero(num) {
      if (Number(num) < 10) {
        return `0${num}`;
      }
      return num;
    },
  },
  created() {
    this.getCoupons();
  },
};
</script>
