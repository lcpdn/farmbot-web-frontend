import * as React from "react";
import { StepDragger, NULL_DRAGGER_ID } from "../../draggable/step_dragger";
import { CeleryNode as Step } from "../corpus";
import { pushStep } from "../actions";

interface StepButtonParams {
    step: Step;
    dispatch: Function;
    children?: JSX.Element | undefined;
    color: string;
}

let click = (dispatch: Function, step: Step) =>
    (event: React.FormEvent<HTMLButtonElement>) => {
        dispatch(pushStep(step));
    };

export function StepButton({ children, step, color, dispatch}:
    StepButtonParams) {
    return <div className="col-xs-6 col-sm-12">
        <div className="block-wrapper">
            <StepDragger dispatch={dispatch}
                step={step}
                ghostCss="step-drag-ghost-image"
                intent="step_splice"
                draggerId={NULL_DRAGGER_ID}>
                <button className={
                    `full-width text-left ${color}-block block-header block`
                }
                    onClick={click(dispatch, step)}>
                    {children}
                    <i className="fa fa-arrows block-control" />
                </button>
            </StepDragger>
        </div>
    </div >;
}