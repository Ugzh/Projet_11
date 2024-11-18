export const Homecard = ({ iconPath, iconAlt, title, description }) => {
  return (
    <div className="feature-item">
      <img src={iconPath} alt={iconAlt} className="feature-icon" />
      <h3 className="feature-item-title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};
