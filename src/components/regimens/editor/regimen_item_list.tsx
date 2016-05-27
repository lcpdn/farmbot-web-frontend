import * as React from "react";
import { RegimenItem } from "../interfaces";
import * as moment from "moment";
import { duration } from "moment";
import { removeRegimenItem } from "../actions";

interface RegimenItemListProps {
  items: RegimenItem[];
  dispatch: Function;
}

export function RegimenItemList({ items, dispatch }: RegimenItemListProps) {
  let groups = _.groupBy<RegimenItem>(items, function(item: RegimenItem) {
    return duration(item.timeOffset).days();
  });

  let list = _.map(groups, function(innerItems, day) {
    return <RegimenItemDayGroup day={ day }
                                items={ innerItems }
                                key={ day }
                                dispatch={ dispatch }/>;
  });
  return <div> { list } </div>;
}

interface RegimenItemStepProps {
  item: RegimenItem;
  dispatch: Function;
}
function RegimenItemStep({ item, dispatch }: RegimenItemStepProps) {
  let d = duration(item.timeOffset);
  let time = moment({
    hour: d.hours(),
    minute: d.minutes()
  }).format("h:mm a");

  return <div className="regimen-event">
  <span className="regimen-event-title"> { item.sequence.name } </span>
  <span className="regimen-event-time"> { time } </span>
  <i className="fa fa-trash regimen-control"
     onClick={ () => dispatch(removeRegimenItem(item)) } />
  </div>;
}

interface RegimenItemDayGroupProps {
    day: string;
    items: RegimenItem[];
    dispatch: Function;
}

function RegimenItemDayGroup({ day,
                               items,
                               dispatch }: RegimenItemDayGroupProps) {
    return <div className="regimen-day">
        <label>Day { day }</label>
        { items.map(function(item, inx) {
            return <RegimenItemStep item={ item }
                                    key={ inx }
                                    dispatch={ dispatch } />;
        }) }
    </div>;
}