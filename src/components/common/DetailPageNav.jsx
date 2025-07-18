import detailnavimage from "../../assets/detailnavimg.jpg";
import { Link,useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import allProductsCombined from "../dummyData/allProductsCombined";



export default function DetailPageNav() {

const navigate = useNavigate();
const { id } = useParams();
const product = allProductsCombined.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="pt-28 px-4 text-center text-gray-500">
        Product not found.
      </div>
    );
  }
 return (
<>
 {/* // nav image section below the navbar */}
        <section
          className="relative h-64 w-full flex items-center justify-center text-center text-white mb-20"
          style={{
            backgroundImage: `url(${detailnavimage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>

           {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="absolute top-10 left-4 z-20 bg-white text-black px-3 py-1 text-sm rounded hover:bg-orange-500 hover:text-white transition"
          >
            ← Back
          </button>

          <div className="relative z-10">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-sm text-gray-200 mt-2">
              <Link
                to="/collection"
                className="hover:text-orange-500 transition"
              >
                Shop
              </Link>{" "}
              &gt; {product.name}
            </p>
          </div>
        </section>
</>
 )
}