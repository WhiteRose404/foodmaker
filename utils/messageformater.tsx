export default function(items: any[], table: number){
    const order = items.map((order: any)=>{
        const items = (
            `orderId: ${order._id}, item: ${order.name}, price: ${order.price}, quantity: ${order.quantity}, commentaire: ${order.commentaire}`
        )
    }).join("\n")
    return (`table ${table} has a new request: \n${items}`);
}