export const getContent = async (req,res)=>{
    try {
        console.log(req.body);
        return res.status(200).send("Server is up")
    } catch (error) {
        console.log(error)
    }
}