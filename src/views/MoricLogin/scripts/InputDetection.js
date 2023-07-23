export default {
    // 策略对象 - 检查用户名是否为空
    "emptyUsernameStrategy":{
      isValid(value) {
        return value.trim() !== '';
      }
    },
    // 策略对象 - 检查密码是否大于等于 6 位数
    "validPasswordStrategy":{
      isValid(value) {
        return value.length > 0;
      }
    },
    // 策略对象 - 检查邮箱格式是否正确
    "validEmailStrategy":{
      isValid(value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
      }
    },
    // 策略对象 - 检查用户名格式是否正确
    "validUserIdStrategy":{
      isValid(value) {
        const emailRegex = /^\d{5,}$/;
        return emailRegex.test(value);
      }
    },
    // 设置要执行的策略
    setStrategy(strategy) {
        this.strategy = this[strategy];
    },
    // 执行注册检测
    check(value) {
        return this.strategy.isValid(value);
    }
}
