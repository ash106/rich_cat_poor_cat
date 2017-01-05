class AddMaskParamsToCats < ActiveRecord::Migration[5.0]
  def change
    add_column :cats, :x, :integer
    add_column :cats, :y, :integer
    add_column :cats, :radius, :integer
  end
end
