import prisma from './src/config/db';

async function testConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    const services = await prisma.service.findMany();
    console.log('📊 Services:', services);
    
    await prisma.$disconnect();
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
}

testConnection();