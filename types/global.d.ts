/**
 * Global ambient declarations shared across the whole project.
 * Keep only project-wide augmentations here (no runtime exports).
 */

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'test' | 'staging' | 'production';
      PORT?: string;
      TEST_DATABASE_NAME?: string;
    }
  }
}

export {};
