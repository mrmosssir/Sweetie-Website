<template>
  <div class="container" v-if="!returnLoading">
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
      <div class="col-md-4 mt-4" v-for="item in returnCoupons" :key="item.id">
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
        <li class="page-item" v-for="num in returnPage"
            :key="num"
            @click.prevent="getCoupons(num)"
            :class="{'active': returnCurrentPage == num}">
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
              <input type="text" class="form-control" v-model="returnCoupon.title">
            </div>
            <div class="form-group">
              <label for="image">優惠券代碼</label>
              <input type="text" onKeyUp="value=value.replace(/[\W]/g,'')"
                     class="form-control" v-model="returnCoupon.code">
            </div>
            <div class="form-group">
              <label for="image">折扣百分比</label>
              <input type="number" max="100" min="0" step="5" class="form-control"
                     v-model="returnCoupon.percent" @click.prevent>
            </div>
            <div class="form-group">
              <label for="image">到期日</label>
              <input type="datetime-local" class="form-control"
                     v-model="returnCoupon.dueDate">
            </div>
            <div class="form-check">
              <input class="form-check-input" type="checkbox"
                     id="is_enabled"
                     v-model="returnCoupon.is_enabled">
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
import { mapGetters } from 'vuex';

export default {
  name: 'Coupons',
  methods: {
    getCoupons(page = 1) {
      this.$store.dispatch('adminCoupon/adminGetCoupons', page);
      this.$store.dispatch('changeSearchMode', 'coupon');
    },
    submitCoupon() {
      this.$store.dispatch('adminCoupon/adminSubmitCoupon', this.coupon.id);
    },
    deleteCoupon() {
      this.$store.dispatch('adminCoupon/adminDeleteCoupon', this.coupon.id);
    },
    openModal(isNew = true, item) {
      this.$store.dispatch('adminCoupon/adminCouponOpenModal', {
        isNew,
        item,
      });
      this.coupon = this.returnCoupon;
    },
    dateTransfer(date) {
      const dateOrigin = new Date(date);
      return `${dateOrigin.getFullYear()}-${this.addZero(dateOrigin.getMonth() + 1)}-${this.addZero(dateOrigin.getDate())} ${this.addZero(dateOrigin.getHours())}:${this.addZero(dateOrigin.getMinutes())}`;
    },
    addZero(num) {
      if (num < 10) {
        return `0${num}`;
      }
      return num;
    },
  },
  computed: {
    ...mapGetters(['returnLoading']),
    ...mapGetters('adminCoupon', ['returnCoupons', 'returnCoupon', 'returnIsNew', 'returnPage', 'returnCurrentPage']),
  },
  created() {
    this.getCoupons();
  },
};
</script>
