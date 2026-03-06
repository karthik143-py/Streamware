import { generateStreamToken } from '../lib/stream.js';
export async function getStreamToken(req, res) {
    try {
        const userId = req.user.id;
        const token = generateStreamToken(userId);
        res.status(200).json({ token});
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
}
