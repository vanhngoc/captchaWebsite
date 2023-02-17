package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.HistoryOrder;
import com.mycompany.myapp.domain.User;
import com.mycompany.myapp.repository.HistoryOrderRespository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.repository.UserRepository;
import com.mycompany.myapp.security.SecurityUtils;
import com.mycompany.myapp.service.dto.HistoryOrderDTO;
import com.mycompany.myapp.web.rest.vm.HistoryOrderRequest;
import java.security.SecureRandom;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.List;
import javax.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class HistoryOrderService {

    private final Logger log = LoggerFactory.getLogger(HistoryOrderService.class);

    private final HistoryOrderRespository historyOrderRespository;

    private final UserRepository userRepository;

    private static final SecureRandom sr = new SecureRandom();

    public HistoryOrderService(HistoryOrderRespository historyOrderRespository, UserRepository userRepository) {
        this.historyOrderRespository = historyOrderRespository;
        this.userRepository = userRepository;
    }

    public HistoryOrder addHistoryOrder(HistoryOrderRequest historyOrderRequest) {
        log.debug("Request to add HistoryOrder");
        User user = userRepository.findOneByMerchantKey(historyOrderRequest.getMerchantKey()).get();
        DecimalFormat myFormatter = new DecimalFormat("ECAPT-000000");
        // String orderNumber = myFormatter.format(2);
        long val = sr.nextLong();
        String code = "ECAPT-" + Long.toString(Math.abs(val)).substring(0, 6);
        HistoryOrder historyOrder = new HistoryOrder();
        historyOrder.setOrderNumber(code);
        historyOrder.setQuantityCaptcha(historyOrderRequest.getQuantityCaptcha());
        historyOrder.setTotalCost(historyOrderRequest.getTotalCost());
        historyOrder.setOrderStatus("Successful");
        historyOrder.setUser(user);

        historyOrderRespository.save(historyOrder);

        return historyOrder;
    }

    public List<HistoryOrderDTO> getHistoryOrders() {
        log.debug("Request to get HistoryOrder");
        User user = SecurityUtils.getCurrentUserLogin().flatMap(userRepository::findOneByLogin).get();
        // User user = userRepository.findOneByMerchantKey(merchantKey).get();
        List<HistoryOrder> historyOrders = historyOrderRespository.findByUserId(user.getId());
        List<HistoryOrderDTO> historyOrdersDTO = new ArrayList<>();

        for (HistoryOrder historyOrder : historyOrders) {
            HistoryOrderDTO historyOrderDTO = HistoryOrderDTO.toHistoryOrderDTOs(historyOrder);
            historyOrdersDTO.add(historyOrderDTO);
        }
        return historyOrdersDTO;
    }

    public Page<HistoryOrderDTO> getAllHistoryOrder(Pageable pageable) {
        return historyOrderRespository.findAll(pageable).map(HistoryOrderDTO::new);
    }
}
