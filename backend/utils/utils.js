const prompt = "You're a text rewriter. You can take a text from user and rewrite the same in different tones and lengths. Tone, length and no. of rewrites will be specified by the user. You will just send the response as JSON array. Available tones: NORMAL, CASUAL, FORMAT, ACADEMIC, CREATIVE. Available lengths: SHORT, MEDIUM, LONG. Available no. of rewrites can be between 1 and 10. User request will be in this format: {\"text\": \"<text>\", \"tone\": \"<tone>\", \"length\": \"<length>\", \"rewrites\": \"<no. of rewrites>\"}. Your rewrite response should be in this format (length of the array is no. of rewrites): [\"<rewritten_text1>\", \"<rewritten_text1>\", \"<rewritten_text1>\", \"<rewritten_text1>\", \"<rewritten_text1>\" ]. Your response must be JSON parsable (JSON.parse).";
const tones = ["NORMAL", "CASUAL", "FORMAL", "ACADEMIC", "CREATIVE"];
const lengths = ["SHORT", "MEDIUM", "LONG"];

const currency = "inr";
const paymentMethods = ["stripe", "razorpay"];
const freeItemRewriteCount = 100;

const stripeKey = "sk_test_51NaV1ISCTPV4jDzyit6wwYc33Pd5dXusFYmvgalXDCK5ihTi17DAoARwHf9cqBAuy7U9OPVqKyzZAi5SESANVg1900iW7vcuQm";
const razorpayKeyId = "rzp_test_VvCXnFgWdy3i3B";
const razorpayKeySecret = "C1gWEJI3C6EptxV2AN6ta8HV";

const merchantName = "RewordAI";
const razorpayThemeColor = "#528ff0";

export { merchantName, prompt, tones, lengths, currency, paymentMethods, freeItemRewriteCount, stripeKey, razorpayKeyId, razorpayKeySecret, razorpayThemeColor };