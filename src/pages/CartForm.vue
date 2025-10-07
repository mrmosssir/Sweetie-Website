<template>
  <div class="row mt-4 align-items-start">
    <div class="col-md-4">
      <CartList />
    </div>
    <div class="col-md-8">
      <h2 class="h5 text-brown font-weight-normal mb-4 margin-mobile">訂單資訊</h2>
      <Form @submit="createOrder" v-slot="{ errors }">
        <div class="row">
          <div class="form-group col-6">
            <label class="text-secondary" for="name">姓名</label>
            <Field 
              class="form-control" 
              v-model="form.user.name" 
              type="text" 
              id="name"
              :class="{'is-invalid': errors.name}"
              rules="required" 
              name="name" 
              v-slot="{ field }"
            >
              <input v-bind="field" class="form-control" :class="{'is-invalid': errors.name}" />
            </Field>
            <ErrorMessage name="name" class="text-danger" />
          </div>
          <div class="form-group col-6">
            <label class="text-secondary" for="phone">電話</label>
            <Field 
              class="form-control" 
              v-model="form.user.tel" 
              type="number" 
              id="phone"
              :class="{'is-invalid': errors.phone}"
              rules="required" 
              name="phone"
              v-slot="{ field }"
            >
              <input v-bind="field" class="form-control" :class="{'is-invalid': errors.phone}" />
            </Field>
            <ErrorMessage name="phone" class="text-danger" />
          </div>
        </div>
        <div class="form-group">
          <label class="text-secondary mt-4" for="mail">電子郵件</label>
          <Field 
            class="form-control" 
            v-model="form.user.email" 
            type="text" 
            id="mail"
            :class="{'is-invalid': errors.mail}"
            rules="required|email" 
            name="mail"
            v-slot="{ field }"
          >
            <input v-bind="field" class="form-control" :class="{'is-invalid': errors.mail}" />
          </Field>
          <ErrorMessage name="mail" class="text-danger" />
        </div>
        <div class="form-group">
          <label class="text-secondary mt-4" for="address">地址</label>
          <Field 
            class="form-control" 
            v-model="form.user.address" 
            type="text" 
            id="address"
            :class="{'is-invalid': errors.address}"
            rules="required" 
            name="address"
            v-slot="{ field }"
          >
            <input v-bind="field" class="form-control" :class="{'is-invalid': errors.address}" />
          </Field>
          <ErrorMessage name="address" class="text-danger" />
        </div>
        <div class="form-group">
          <label class="text-secondary mt-4" for="content">
            備註
            <small class="text-brown">(請告知我們用餐時間與人數)</small>
          </label>
          <Field 
            cols="50" 
            rows="10" 
            class="form-control"
            v-model="form.message" 
            id="content"
            :class="{'is-invalid': errors.message}"
            rules="required" 
            name="message"
            v-slot="{ field }"
          >
            <textarea v-bind="field" cols="50" rows="10" class="form-control" :class="{'is-invalid': errors.message}"></textarea>
          </Field>
          <ErrorMessage name="message" class="text-danger" />
        </div>
        <hr>
        <button class="btn btn-block btn-brown" type="submit">前往付款</button>
      </Form>
    </div>
  </div>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate';
import CartList from '../components/CartList.vue';

export default {
  name: 'Cartform',
  data() {
    return {
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
    };
  },
  components: {
    CartList,
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    getCarts() {
      this.$store.dispatch('clientCart/clientGetCarts');
    },
    createOrder() {
      if (this.$store.state.clientCart.carts.length > 0) {
        this.$store.dispatch('clientCart/clientCreateOrder', this.form);
      } else {
        this.$store.commit('ERROR', {
          error: true,
          message: '表單內容錯誤 可能資料或購物車是空的哦 ! 要不要再去多逛逛 ^^',
        });
        setTimeout(() => {
          this.$store.commit('ERROR', {
            error: false,
            message: '',
          });
        }, 3000);
      }
    },
  },
  created() {
    this.getCarts();
  },
};
</script>
