/**
 * API 认证中间件
 */

export function validateApiKey(url, env) {
    // 从 Cloudflare Secrets 获取 API 密钥
    const requiredKey = env.API_SECRET;
    
    // 如果没有配置密钥，允许访问（可选���
    if (!requiredKey) {
        return true;
    }
    
    // 从 query 参数中获取提供的密钥
    const params = new URL(url).searchParams;
    const providedKey = params.get("key") || params.get("apikey");
    
    // 比对密钥
    return providedKey === requiredKey;
}

export function unauthorizedResponse() {
    return new Response(JSON.stringify({
        error: "Unauthorized",
        message: "Missing or invalid API key. Please provide ?key=YOUR_API_KEY"
    }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
    });
}