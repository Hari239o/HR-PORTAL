const { execSync } = require('child_process');

console.log('Running prisma generate...');
try {
  execSync('npx prisma generate', { stdio: 'inherit' });
} catch (error) {
  console.error('Failed to generate Prisma client:', error);
  process.exit(1);
}

// Only run prisma db push if DATABASE_URL is provided in the environment
if (process.env.DATABASE_URL) {
  console.log('DATABASE_URL detected. Synchronizing database schema with prisma db push...');
  try {
    execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
    console.log('Prisma db push completed successfully.');
  } catch (error) {
    console.warn('Warning: prisma db push failed (check database connection and permissions). Continuing build...');
  }
} else {
  console.log('Notice: DATABASE_URL is not set in environment variables. Skipping prisma db push.');
}
