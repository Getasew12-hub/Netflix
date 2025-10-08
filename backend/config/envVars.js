import env from "dotenv";
env.config();

export const ENV_VARS={
    port:process.env.PORT || 5000,
    key:process.env.TOKEN_KEY,
    movie_key:process.env.MOVEIS_KEY,
    neon_key:process.env.NEONE_KEY
}