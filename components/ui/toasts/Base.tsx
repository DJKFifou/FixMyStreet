const Base = ({
  borderColor, bgColor, textColor, icon, children
}: {
  borderColor: string,
  bgColor: string,
  textColor: string,
  icon: string,
  children: React.ReactNode
}) => {
  const classes = {
    divClasses: `flex items-center gap-3 p-2 border-2 ${borderColor} ${bgColor} ${textColor} rounded-md mb-3`,
    iconClasses: `material-symbols-outlined px-1 ${textColor}`,
    paragraphClasses: "flex flex-col gap-3"
  };

  return (
    <div className={classes.divClasses}>
      <i className={classes.iconClasses}>{icon}</i>
      <p className={classes.paragraphClasses}>
        {children}
      </p>
    </div>
  );
}

export default Base;
