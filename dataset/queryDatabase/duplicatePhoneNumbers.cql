match (phone:Phone)
with phone.telephone as telephone, collect(phone) as nodelist, count(*) as count
where count > 1
return telephone, nodelist, count
