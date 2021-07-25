import connectDB from '../../config/db';
import User from '../../models/User';

const handler = async (req, res) => {
  await connectDB();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.find();
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        console.log(error);
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const user = await User.create(req.body);

        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
    default:
      break;
  }
};

export default handler;
