import { useRef, FC } from "react";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/types/index";
import { useDrag, useDrop } from "react-dnd";
import {
  deleteConstructorItem,
} from "../../services/actions/constructor";
import styles from "./burger-constructor-items.module.css";
import { CONSTRUCTOR_MOVE_ITEM } from "../../services/actions/constants/constructor";
import { TConstructorIngredient } from "../../services/types/data";

type TDragItem = {
	index: number;
	type: string;
	id?: string;
};

type TConstructorItems = {
  index: number, 
  item: TConstructorIngredient;
}

const ConstructorItems: FC<TConstructorItems> = ({ index, item }) => {
	const { image, id, price, name } = item;
	const ref = useRef(null);
  const dispatch = useDispatch();

  const onDelete = (id: string) => {
    dispatch(
      deleteConstructorItem(id)
    );
  };

  const [{ opacity }, drag] = useDrag({
    type: "item",
    item: { id, index },
    collect: (monitor) => {
      return {
        opacity: monitor.isDragging() ? 0.5 : 1,
      };
    },
  });

  const [, drop] = useDrop<TDragItem >({
    accept: "item",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      dispatch({
        type: CONSTRUCTOR_MOVE_ITEM,
        data: { dragIndex, hoverIndex },
      });
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <li
      className={`${styles.stuffingItem} mb-4 mr-4 ml-4`}
      style={{ opacity }}
      ref={ref}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={name}
        price={price}
        thumbnail={image}
        handleClose={() => onDelete(item.id)}
      />
    </li>
  );
};

export default ConstructorItems;
