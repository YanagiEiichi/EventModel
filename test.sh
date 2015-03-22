for i in `find tests/*.js`
do
  result=`node $i`
  if [ "$result" = 'true' ]; then
    echo Testing $i '... \033[32mOK\033[0m'
  else
    echo Testing $i '... \033[31mError\033[0m'
  fi
done

