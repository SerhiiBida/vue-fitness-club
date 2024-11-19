<script setup>
import {useRouter} from "vue-router";
import {reactive} from "vue";
import {GoogleLogin} from "vue3-google-login";

import {useAuthForm} from "@/composables/Auth/useAuthForm.js";
import {useAuth} from "@/composables/Auth/useAuth.js";
import {useSocialAuth} from "@/composables/Auth/useSocialAuth.js";


const {
  formRef, emailRules, passwordRules,
  serverErrors, resetServerErrors, validateForm
} = useAuthForm();

const router = useRouter();

// Форма
const form = reactive({
  email: "",
  password: "",
});

// Авторизация
const authorization = async () => {
  const valid = await validateForm();

  if (valid) {
    resetServerErrors();

    const {login} = useAuth(router, serverErrors);

    await login(form);
  }
};

// Авторизация через Google
const {loginGoogle} = useSocialAuth(serverErrors, resetServerErrors);
</script>

<template>
  <section class="login-form-wrapper">
    <!--Заголовки-->
    <v-img
        class="mx-auto my-4"
        max-width="70"
        src="/src/assets/images/logo.png"
        alt="logo"
    ></v-img>
    <p class="text-h4 text-center font-weight-bold mb-2">
      Welcome back!
    </p>
    <p class="text-h6 font-weight-regular text-center mb-8">
      Log into your account
    </p>

    <!--Форма-->
    <v-form
        ref="formRef"
        action="#"
        method="post"
        class="login-form"
        @submit.prevent="authorization"
    >
      <v-text-field
          v-model="form.email"
          class="mb-2"
          label="Email"
          type="email"
          :rules="emailRules"
          :error-messages="serverErrors.email"
          @input="serverErrors.email.length = 0"
          variant="outlined"
          required
      >
      </v-text-field>
      <v-text-field
          v-model="form.password"
          class="mb-2"
          label="Password"
          type="password"
          :rules="passwordRules"
          :error-messages="serverErrors.password"
          @input="serverErrors.password.length = 0"
          variant="outlined"
          required
      >
      </v-text-field>

      <p class="text-red text-center mb-1">
        {{ serverErrors.general }}
      </p>

      <v-btn
          class="mb-3"
          type="submit"
          block
          color="orange-darken-3"
      >
        Log in
      </v-btn>

      <v-divider
          class="border-opacity-100 my-5"
          color="orange-darken-3"
      >
        Or continue with
      </v-divider>

      <!--Авторизация через Google-->
      <div class="d-flex justify-center mb-2">
        <v-btn
            class="ma-2"
            color="red"
            icon="mdi-google"
            @click="loginGoogle"
        ></v-btn>
      </div>

      <p class="text-center">
        Don't have an account?
        <RouterLink :to="{name: 'register'}">
          <a href="#">
            Sign up
          </a>
        </RouterLink>
      </p>
    </v-form>
  </section>
</template>