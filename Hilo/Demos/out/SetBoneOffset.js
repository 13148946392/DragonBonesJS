"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SetBoneOffset = (function (_super) {
    __extends(SetBoneOffset, _super);
    function SetBoneOffset() {
        var _this = _super.call(this) || this;
        _this._resources.push("resource/assets/effect_ske.json", "resource/assets/effect_tex.json", "resource/assets/effect_tex.png");
        return _this;
    }
    SetBoneOffset.prototype._onStart = function () {
        var _this = this;
        var factory = dragonBones.HiloFactory.factory;
        factory.parseDragonBonesData(this._hiloResources["resource/assets/effect_ske.json"]);
        factory.parseTextureAtlasData(this._hiloResources["resource/assets/effect_tex.json"], this._hiloResources["resource/assets/effect_tex.png"]);
        for (var i = 0; i < 100; ++i) {
            var armatureDisplay = factory.buildArmatureDisplay("effect");
            armatureDisplay.addDBEventListener(dragonBones.EventObject.COMPLETE, function (event) {
                var eventObject = event.detail;
                _this._moveTo(eventObject.armature.display);
            }, this);
            this._moveTo(armatureDisplay);
            this.addChild(armatureDisplay);
        }
    };
    SetBoneOffset.prototype._moveTo = function (armatureDisplay) {
        var fromX = Math.random() * this.stageWidth;
        var fromY = Math.random() * this.stageHeight;
        var toX = Math.random() * this.stageWidth;
        var toY = Math.random() * this.stageHeight;
        var dX = toX - fromX;
        var dY = toY - fromY;
        var rootSlot = armatureDisplay.armature.getBone("root");
        var effectSlot = armatureDisplay.armature.getBone("effect");
        // Modify root and effect bone offset.
        rootSlot.offset.scaleX = Math.sqrt(dX * dX + dY * dY) / 100; // Effect translate distance is 100 px.
        rootSlot.offset.rotation = Math.atan2(dY, dX);
        rootSlot.offset.skew = Math.random() * Math.PI - Math.PI * 0.5; // Random skew.
        effectSlot.offset.scaleX = 0.5 + Math.random() * 0.5; // Random scale.
        effectSlot.offset.scaleY = 0.5 + Math.random() * 0.5;
        // Update root and effect bone.
        rootSlot.invalidUpdate();
        effectSlot.invalidUpdate();
        //
        armatureDisplay.x = fromX;
        armatureDisplay.y = fromY;
        armatureDisplay.animation.timeScale = 0.5 + Math.random() * 1.0; // Random animation speed.
        armatureDisplay.animation.play("idle", 1);
    };
    return SetBoneOffset;
}(BaseTest));
