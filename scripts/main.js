Events.on(ContentInitEvent, () => {
const f0c = Vars.content.getByName(
    ContentType.liquid,
    "suppae-mod-f-0c"
);

const rates = {};

rates[Items.copper.id] = 2;
rates[Items.lead.id] = 3;
rates[Items.silicon.id] = 8;
rates[Items.titanium.id] = 12;
rates[Items.thorium.id] = 20;

const acceptedItems = [
    Items.copper,
    Items.lead,
    Items.silicon,
    Items.titanium,
    Items.thorium
];

const node = Vars.content.getByName(
    ContentType.block,
    "suppae-mod-trading-node"
);

node.buildType = () => extend(GenericCrafter.GenericCrafterBuild, node, {
    updateTile() {
        // Accumulate production time.
        this.progress = Math.min(
            this.progress + this.delta(),
            60
        );

        // Find an available item.
        var selected = null;

        for (var i = 0; i < acceptedItems.length; i++) {
            var item = acceptedItems[i];

            if (this.items.get(item) > 0) {
                selected = item;
                break;
            }
        }

        if (selected != null && this.progress >= 60) {
            var amount = rates[selected.id];

            if (this.liquids.get(f0c) + amount <= this.liquidCapacity) {
                this.items.remove(selected, 1);
                this.liquids.add(f0c, amount);

                this.progress = 0;
            }
        }

        this.dumpLiquid(f0c);
    },

    acceptItem(source, item) {
        return rates[item.id] !== undefined &&
            this.items.get(item) < this.itemCapacity;
    }
})
})
