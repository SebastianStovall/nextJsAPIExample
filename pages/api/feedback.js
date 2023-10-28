import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function handler(req, res) {

    if (req.method === 'POST') {
        await createTestInstance(req.body.email, req.body.text, res)
    }

    if(req.method === "GET") {
        try {
            const feedback = await prisma.test.findMany();
            res.status(200)
            res.json(feedback)
        } catch (error) {
            console.error(error);
            // chaining on the .json will send back the response on top of also sending back a status code
            res.status(500).json({ error: 'Something Went Retreiving Feeback' });
        } finally {
            await prisma.$disconnect();
        }
    }
}


// if req.method === 'POST', create an instance on the Test table on prisma db
async function createTestInstance(email, text, res) {
    try {
        const instanceOnTestTable = await prisma.test.create( {data: {email: email, text: text}} )
        console.log('INSTANCE CREATED TO test TABLE IN PRISMA DB ---> ', instanceOnTestTable);
        res.status(201).json({ message: 'Feedback created successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Something Went Wrong Creating Feeback' });
    } finally {
        await prisma.$disconnect();
    }
}


export default handler
