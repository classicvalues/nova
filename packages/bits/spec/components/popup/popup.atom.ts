// © 2022 SolarWinds Worldwide, LLC. All rights reserved.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
//  of this software and associated documentation files (the "Software"), to
//  deal in the Software without restriction, including without limitation the
//  rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
//  sell copies of the Software, and to permit persons to whom the Software is
//  furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
//  all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
//  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
//  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
//  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
//  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
//  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
//  THE SOFTWARE.

import {
    browser,
    by,
    element,
    ElementFinder,
    ExpectedConditions,
} from "protractor";

import { Atom } from "../../atom";
import { OverlayContentAtom } from "./overlay-content.atom";

export class PopupAtom extends Atom {
    public static CSS_CLASS = "nui-popup";
    private body = element(by.tagName("body"));

    private popupBox = Atom.findIn(OverlayContentAtom, this.getElement());
    private popupBoxDetached = Atom.findIn(OverlayContentAtom, this.body);

    public getPopupToggle(): ElementFinder {
        return this.getElement().element(by.css("[nuiPopupToggle]"));
    }

    public async isOpened(): Promise<boolean> {
        return (await this.popupBox.count(this.getElement())) === 1;
    }

    public async isOpenedAppendToBody(): Promise<boolean> {
        return (await this.popupBoxDetached.count()) === 1;
    }

    public async open(): Promise<void> {
        const toggle = this.getPopupToggle();
        await toggle.click();
        return browser.wait(
            ExpectedConditions.visibilityOf(this.popupBox.getElement()),
            500
        );
    }

    public getPopupBox(): ElementFinder {
        return this.popupBox.getElement();
    }

    public getPopupBoxDetached(): OverlayContentAtom {
        return this.popupBoxDetached;
    }

    public getPopupBoxDetachedArea(): ElementFinder {
        return this.popupBoxDetached
            .getElement()
            .element(by.css(".nui-popup__area"));
    }
}
