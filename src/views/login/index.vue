<template>
  <div>
    姓名：<input v-model="user.name" type="text" /> 密码：<input
      v-model="user.password"
      type="password"
    />
  </div>

  <button type="button" @click="user.onClickLogin">登录</button>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { User } from "../../models/User";
import { useRouter } from "vue-router";
import { doLogin } from "../../api/user";

const router = useRouter();
const login = (user: any) => {
  doLogin({
    identifier: user.name,
    password: user.password,
  })
    .then(function (res) {
      router.push("/table");
    })
    .catch(function (error) {
      console.log(error);
    });
};

const user = ref(new User("", "", login));
onMounted(() => {
  console.log(user);
});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
