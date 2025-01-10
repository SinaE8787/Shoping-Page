import { useContext } from 'react';
import styles from './FormData.module.css';
import ProductProvider from '../../../context/ProductProvider';

const BillingFormData = () => {
  const { formDataError, setFormDataError, formData, setFormData } = useContext(ProductProvider);

  const changeFilds = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setFormDataError((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };
  return (
    <form className={styles.form}>
      <h2>BILLING ADDRESS</h2>
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={changeFilds}
        />
        {formDataError.firstName && <p className={styles.error}>{formDataError.firstName}</p>}
      </div>
      <div>
        <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={changeFilds} />
        {formDataError.lastName && <p className={styles.error}>{formDataError.lastName}</p>}
      </div>
      <div>
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={changeFilds} />
        {formDataError.email && <p className={styles.error}>{formDataError.email}</p>}
      </div>
      <div>
        <input type="tel" name="telephone" placeholder="Telephone" value={formData.telephone} onChange={changeFilds} />
        {formDataError.telephone && <p className={styles.error}>{formDataError.telephone}</p>}
      </div>
      <div>
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={changeFilds} />
        {formDataError.address && <p className={styles.error}>{formDataError.address}</p>}
      </div>
      <div>
        <input type="text" name="city" placeholder="City" value={formData.city} onChange={changeFilds} />
        {formDataError.city && <p className={styles.error}>{formDataError.city}</p>}
      </div>
      <div>
        <input type="text" name="country" placeholder="Country" value={formData.country} onChange={changeFilds} />
        {formDataError.country && <p className={styles.error}>{formDataError.country}</p>}
      </div>
    </form>
  );
};

export default BillingFormData;
