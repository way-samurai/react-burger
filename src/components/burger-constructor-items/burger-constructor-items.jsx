import { useRef } from "react";
import PropTypes from "prop-types";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import {
  CONSTRUCTOR_DELETE_ITEM,
  CONSTRUCTOR_MOVE_ITEM,
} from "../../services/actions/constructor";
import styles from "./burger-constructor-items.module.css";
import ingredientType from "../../utils/prop-types";

const ConstructorItems = ({ index, item }) => {
	const { image, id, price, name } = item;
	const ref = useRef(null);
  const dispatch = useDispatch();

  const onDelete = (id) => {
    dispatch({
      type: CONSTRUCTOR_DELETE_ITEM,
      id: id,
    });
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

  const [, drop] = useDrop({
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

ConstructorItems.propTypes = {
  index: PropTypes.number.isRequired,
	item: ingredientType.isRequired
}

export default ConstructorItems;
