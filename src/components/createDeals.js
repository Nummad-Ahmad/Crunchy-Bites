import style from '../styles/createdeals.module.css';
import Navbar from './navbar';
import { useState, useEffect, useRef } from 'react';
import { FaPen } from "react-icons/fa";
import axios from 'axios';
import toast from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function CreateDeal() {

  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [items, setItems] = useState([]);
  const [prices, setPrices] = useState({});

  const [form, setForm] = useState({
    dealName: "",
    description: "",
    dealPrice: 0,
    enableAt: "",
    expiryAt: ""
  });

  const [quantities, setQuantities] = useState({});

  const [isMobile, setIsMobile] = useState(false);

  const enableRef = useRef(null);
  const expiryRef = useRef(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACK_END}/itemdata`)
      .then(res => {
        const data = res.data.data;

        const formattedPrices = {};
        const initialQty = {};

        data.forEach(item => {
          formattedPrices[item.name] = item.price;
          initialQty[item.name] = 0;
        });

        setItems(data);
        setPrices(formattedPrices);
        setQuantities(initialQty);
      });
  }, []);

  const calculateOriginalPrice = () => {
    return Object.keys(quantities).reduce((sum, key) => {
      return sum + (quantities[key] * (prices[key] || 0));
    }, 0);
  };

  const originalPrice = calculateOriginalPrice();

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      dealPrice: originalPrice
    }));
  }, [originalPrice]);

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);

      const res = await axios.post(
        `${process.env.REACT_APP_BACK_END}/upload/image`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        }
      );

      setPreview(res.data.imageUrl);
      setImage(null);

    } catch (err) {
      console.log(err);
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const increment = (name) => {
    setQuantities(prev => ({
      ...prev,
      [name]: prev[name] + 1
    }));
  };

  const decrement = (name) => {
    setQuantities(prev => ({
      ...prev,
      [name]: prev[name] > 0 ? prev[name] - 1 : 0
    }));
  };

const handleSubmit = async () => {

  if (!form.dealName.trim()) {
    return toast.error("Deal name is required");
  }

  if (!form.dealPrice || form.dealPrice <= 0) {
    return toast.error("Deal price is required");
  }

  const selectedItems = Object.keys(quantities)
    .filter(key => quantities[key] > 0)
    .map(key => ({
      name: key,
      quantity: quantities[key]
    }));

  const loadingToast = toast.loading("Creating deal...");

  try {
    await axios.post(`${process.env.REACT_APP_BACK_END}/deals/create`, {
      dealName: form.dealName,
      description: form.description,
      dealPrice: Number(form.dealPrice),
      originalPrice,
      items: selectedItems,
      image: preview,
      enableAt: form.enableAt,
      expiryAt: form.expiryAt
    }, { withCredentials: true });

    toast.success("Deal created successfully 🎉", {
      id: loadingToast
    });

    setForm({
      dealName: "",
      description: "",
      dealPrice: 0,
      enableAt: "",
      expiryAt: ""
    });

    setPreview(null);

    setQuantities(
      Object.fromEntries(Object.keys(quantities).map(k => [k, 0]))
    );

  } catch (err) {
    toast.error("Error creating deal ❌", {
      id: loadingToast
    });
  }
};

  const formatName = (str) => {
  return str
    .split(",") // keep comma-separated items
    .map(item =>
      item
        .trim()
        // split camelCase
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        // capitalize first letter of each word
        .replace(/\b\w/g, (char) => char.toUpperCase())
    )
    .join(", ");
};

return (
  <div className={style.order}>
    <Navbar />

    {/* ✅ ROW 1 */}
    <div className={style.topRow}>

      <input
        className={style.input}
        placeholder="Deal Name "
        value={form.dealName}
        onChange={(e) => setForm({ ...form, dealName: e.target.value })}
      />

      <input
        className={style.input}
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />

      {/* ENABLE */}
      <div
        className={style.dateBox}
      >

        <DatePicker
          selected={form.enableAt ? new Date(form.enableAt) : new Date()}
          onChange={(date) =>
            setForm({ ...form, enableAt: date.toISOString() })
          }
          dateFormat="MMMM d, yyyy h:mm aa"
          name="Enable At"
          showTimeSelect
          shouldCloseOnSelect
          withPortal
          wrapperClassName={style.datePickerWrapper}
        />
      </div>

      {/* EXPIRY */}
      <div
        className={style.dateBox}
      >
      
        <DatePicker
          selected={form.expiryAt ? new Date(form.expiryAt) : new Date()}
          onChange={(date) =>
            setForm({ ...form, expiryAt: date.toISOString() })
          }
          dateFormat="MMMM d, yyyy h:mm aa"
          name="Enable At"
          showTimeSelect
          shouldCloseOnSelect
          withPortal
          wrapperClassName={style.datePickerWrapper}
        />
      </div>

    </div>

    {/* ✅ ROW 2 & 3 (ITEMS) */}
    <div className={style.foodboxcontainer}>
      {items.map(item => (
        <div key={item._id} className={style.foodbox}>
          <p className={style.itemname}>{formatName(item.name)}</p>

          <div style={{fontWeight: 'bold', fontSize: '16px', display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
            <p>Price</p>
            <p style={{ color: 'rgb(240, 99, 49)' }}>{item.price} Rs</p>
          </div>

          <div style={{fontWeight: 'bold', display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
            <p>Quantity</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <p style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => decrement(item.name)}>-</p>
              <p>{quantities[item.name]}</p>
              <p style={{ cursor: 'pointer', fontSize: '18px' }} onClick={() => increment(item.name)}>+</p>
            </div>
          </div>
        </div>
      ))}
      {/* ✅ ROW 3 (UPLOAD + PREVIEW) */}
<div className={style.uploadContainer}>

  {!preview ? (
    <div
      className={style.uploadBox}
      onClick={() => document.getElementById("fileInput").click()}
    >
      <div className={style.uploadContent}>
        <p>{uploading ? "Uploading..." : "Click to upload image"}</p>
      </div>

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className={style.hiddenInput}
        onChange={handleFileChange}
      />
    </div>
  ) : (
    <div className={style.previewContainer}>
      <img src={preview} alt="preview" />

      <div
        className={style.editIcon}
        onClick={() => document.getElementById("fileInput").click()}
      >
        <FaPen />
      </div>

      <input
        id="fileInput"
        type="file"
        accept="image/*"
        className={style.hiddenInput}
        onChange={handleFileChange}
      />
    </div>
  )}

</div>
    </div>

    

    {/* ✅ ROW 4 */}
    <div className={style.bottomRow}>

      <div className={style.price}>
        <p>Original Price</p>
        <p style={{ color: 'rgb(240, 99, 49)' }}>{originalPrice} Rs</p>
      </div>

<div className={style.price}>
  <p>Deal Price</p>

  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
    
    <span
      style={{ cursor: 'pointer', fontSize: '18px' }}
      onClick={() =>
        setForm(prev => ({
          ...prev,
          dealPrice: prev.dealPrice > 0 ? prev.dealPrice - 10 : 0
        }))
      }
    >
      -
    </span>

    <span>{form.dealPrice}</span>

    <span
      style={{ cursor: 'pointer', fontSize: '18px' }}
      onClick={() =>
        setForm(prev => ({
          ...prev,
          dealPrice: prev.dealPrice + 10
        }))
      }
    >
      +
    </span>

  </div>
</div>

      <button className={style.btn} onClick={handleSubmit}>
        Create Deal
      </button>

    </div>

  </div>
);
}