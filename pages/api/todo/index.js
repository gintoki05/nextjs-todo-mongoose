import connectDB from '../../../config/db';
import Todo from '../../../models/Todo';

const handler = async (req, res) => {
  await connectDB();

  const { method } = req;

  console.log(method);

  switch (method) {
    case 'GET':
      try {
        const todo = await Todo.find();
        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const todo = await Todo.create(req.body);

        res.status(200).json({ success: true, data: todo });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      break;
  }
};

export default handler;
