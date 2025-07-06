import Stripe from "stripe";
const stripe = new Stripe(import.meta.env.ASTRO_STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

/**
 * 创建 Stripe Checkout 会话
 * - 使用指定的价格 ID 创建单次付款的 Checkout 会话
 * - 会话完成后会跳转至 success_url，取消则跳转至 cancel_url
 * - 注意：该函数应在服务端调用，不应暴露于客户端代码中
 * 
 * 环境变量依赖：
 * - ASTR0_STRIPE_SECRET_KEY：Stripe 后端密钥（必须保密）
 * - PUBLIC_BASE_URL：构建成功/取消后的回调地址前缀
 * 
 * 安全提示：
 * - success_url 和 cancel_url 可在生产环境中动态传入以防止伪造回调路径
 * - 后续建议接入 Webhook 验证支付结果并与用户账户绑定
 */
export async function createCheckoutSession(priceId) {
  return stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "payment",
    success_url: `${import.meta.env.PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${import.meta.env.PUBLIC_BASE_URL}/courses`,
  });
}
//暂时如此写，后续会根据实际情况调整