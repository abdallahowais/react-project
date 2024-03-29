import style from './Notfound.module.css'


export default function Notfound() {
  return (
    <div className={style.bg}>
      <h2 className={style.title}>Page Not Found</h2>
      <h2 className={style.title}>ERROR</h2>
    </div>
  );
}

