import styles from './app.module.css';
import { useState } from 'react';

const formatDate = (date) => {
	const day = String(date.getDate()).padStart(2, '0');
	const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
	const year = date.getFullYear();
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');

	let isValueVaild = value.length < 3 ? false : true;

	const onInputButtonClick = () => {
		const promptValue = prompt();
		if (promptValue.length < 3) {
			setError('Сообщение должно содержать не менее трех символов');
		} else {
			setValue(promptValue);
			setError('');
		}
	};

	const onAddButtonClick = () => {
		if (isValueVaild) {
			setList((list) => {
				const updatedList = [
					...list,
					{ id: Date.now(), value: value, date: formatDate(new Date()) },
				];
				console.log(updatedList);
				return updatedList;
			});
			setValue('');
			setError('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error ? <div className="error">{error}</div> : null}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					className={styles.button}
					disabled={!isValueVaild}
					onClick={onAddButtonClick}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>

				{list.length !== 0 ? (
					<ul className={styles.list}>
						{list.map((element) => {
							return (
								<li className={styles['list-item']} key={element.id}>
									{element.value} - {element.date}
								</li>
							);
						})}
					</ul>
				) : (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	); // вся функция является декларативным стилем
};
