class Admin::PagesController < ApplicationController
  # load_and_authorize_resource ## esto da error con chartkick
  before_action :require_admin

  def index
    orders_raw = Order.group(:status).count
    @orders = {}
    @orders[:pendiente] = orders_raw[0]
    @orders[:pagado] = orders_raw[1]
    @orders[:cancelado] = orders_raw[2]

    @paid_orders = Order.paid.group_by_day(:updated_at, format:'%d/%m/%y').count


  end
end
