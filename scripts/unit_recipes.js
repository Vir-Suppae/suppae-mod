let micronic = Vars.content.getByName(ContentType.unit, "suppae-mod-micronic")
print(micronic)
Blocks.navalFactory.plans.add(
  new UnitFactory.UnitPlan(
    micronic,
    60,
    ItemStack.with(
      Items.silicon, 25,
      Items.lead, 15
    )
  )
)
