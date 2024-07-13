import style from './../page.module.css';

export default function UsersSkeleton() {
  const numbers = [1, 2, 3, 4, 5, 6]
  return (
    <section className={style.cardContainer}>
      {numbers.map(num => {
        return <article className={style.skeletonCard}>
          <p className={style.userSkeleton}></p>
        </article>
      })}
    </section>
  )
}
