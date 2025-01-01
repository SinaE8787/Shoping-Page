import styles from './FormData.module.css';

const BillingFormData = () => {
  return (
    <form className={styles.form}>
      <h2>BILLING ADDRESS</h2>
      <input type="text" name="firstName" placeholder="First Name" />
      <input type="text" name="lastName" placeholder="Last Name" />
      <input type="email" name="email" placeholder="Email" />
      <input type="text" name="address" placeholder="Address" />
      <input type="text" name="city" placeholder="City" />
      <input type="text" name="country" placeholder="Country" />
      <input type="text" name="telephone" placeholder="Telephone" />
    </form>
  );
};

export default BillingFormData;
