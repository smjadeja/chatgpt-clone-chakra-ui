import axios from "axios";
import { GPTQuery, ImageQuery } from "../entities/GPTQuery";


console.log(import.meta.env.VITE_API_BASE_URL)
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
    
  }

});

class APIClient<T> {

  getQueryResponse = async (data: GPTQuery) => {

    // const res = await axiosInstance.post<T>('/faq_bot', data);
    return {"text":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur dolorum nihil minima veniam consectetur dolor itaque quibusdam magnam, sequi magni rem mollitia laborum molestias tenetur, quis sapiente consequatur nostrum possimus, nesciunt illo reiciendis tempore voluptates enim unde. Nam quia corrupti tempora eum sed officiis aliquam ratione aliquid inventore, et numquam consequuntur necessitatibus illum aperiam? Praesentium nemo consequatur tempora tenetur ad et incidunt sint laborum quod. Illum quisquam dolor itaque nemo sapiente inventore commodi et magni blanditiis consectetur corrupti libero hic, iste in esse vitae, illo sed sequi. Alias rem temporibus omnis consequuntur illum reiciendis architecto, aliquid quisquam commodi, amet delectus asperiores optio, soluta eveniet. Minus ducimus quibusdam fugit animi obcaecati magni sit laudantium expedita pariatur accusamus unde, eligendi officia exercitationem amet eaque officiis tempore, corporis repellat veritatis. Enim, illo. Quam, repudiandae explicabo corrupti dolor veritatis quis saepe delectus pariatur ipsam numquam odio iure est suscipit minus ratione quia debitis minima ut blanditiis atque exercitationem. Error natus ut saepe eligendi voluptates. Amet dolorem saepe nostrum, iusto ad voluptatibus, voluptates itaque alias laborum laboriosam totam consectetur, sapiente eligendi distinctio! Deleniti commodi facere porro odio asperiores, vel sint, doloremque possimus temporibus corrupti totam adipisci voluptas tenetur labore perferendis eos culpa nostrum reprehenderit fugiat."};
  };

  getImageResponse = async (data : ImageQuery) => {
    console.log(data, "data")
    // const res =  await axiosInstance.post<T>('/customer_inquiries', {"query":"I want to build AI model for my sales data forecast"})
    return {"text":"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur dolorum nihil minima veniam consectetur dolor itaque quibusdam magnam, sequi magni rem mollitia laborum molestias tenetur, quis sapiente consequatur nostrum possimus, nesciunt illo reiciendis tempore voluptates enim unde. Nam quia corrupti tempora eum sed officiis aliquam ratione aliquid inventore, et numquam consequuntur necessitatibus illum aperiam? Praesentium nemo consequatur tempora tenetur ad et incidunt sint laborum quod. Illum quisquam dolor itaque nemo sapiente inventore commodi et magni blanditiis consectetur corrupti libero hic, iste in esse vitae, illo sed sequi. Alias rem temporibus omnis consequuntur illum reiciendis architecto, aliquid quisquam commodi, amet delectus asperiores optio, soluta eveniet. Minus ducimus quibusdam fugit animi obcaecati magni sit laudantium expedita pariatur accusamus unde, eligendi officia exercitationem amet eaque officiis tempore, corporis repellat veritatis. Enim, illo. Quam, repudiandae explicabo corrupti dolor veritatis quis saepe delectus pariatur ipsam numquam odio iure est suscipit minus ratione quia debitis minima ut blanditiis atque exercitationem. Error natus ut saepe eligendi voluptates. Amet dolorem saepe nostrum, iusto ad voluptatibus, voluptates itaque alias laborum laboriosam totam consectetur, sapiente eligendi distinctio! Deleniti commodi facere porro odio asperiores, vel sint, doloremque possimus temporibus corrupti totam adipisci voluptas tenetur labore perferendis eos culpa nostrum reprehenderit fugiat."}
  }
}

export default APIClient;
